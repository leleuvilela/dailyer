import axios from 'axios';
import { Title, Text, Textarea, Container, Code, Timeline, Center, Button, Group } from '@mantine/core';
import { useQuery } from 'react-query';
import { GitBranch, GitCommit, GitPullRequest, MessageDots } from 'tabler-icons-react';
import { useForm, useLocalStorage } from '@mantine/hooks';
import { DateTime } from 'luxon';

interface Pensamento {
  title: string;
  content: string;
  date: string;
}

export default function HomePage() {
  const [pensamentos, setPensamentos] = useLocalStorage<Pensamento[]>({ key: 'pensamentos', defaultValue: [] });
  // const { isLoading, error, data, refetch } = useQuery<Pensamento[]>('getPensamentos', () =>
  //    axios.get('api/pensamentos').then(res => res.data)
  // );

  const form = useForm({
    initialValues: {
      pensamento: '',
    },
  });

  const handleSubmit = (values: any) => {
    setPensamentos([{ title: 'Pensamento', content: values.pensamento, date: new Date().toISOString() }, ...pensamentos]);
    // refetch();
  };

  return (
    <Container>
      <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        <Text inherit variant="gradient" component="span">
          dailyer
        </Text>
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          placeholder="O que você está pensando?"
          label="Escreva aqui algo que queira compartilhar anonimamente."
          autosize
          minRows={2}
          {...form.getInputProps('pensamento')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      <Center mt="30px">
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          {pensamentos?.map(item => (
            <Timeline.Item bullet={<MessageDots size={12} />} title={item.title}>
              <Text color="dimmed" size="sm">{item.content}</Text>
              <Text size="xs" mt={4}>{DateTime.fromISO(item.date).toRelative()} atrás</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Center>
    </Container>
  );
}
