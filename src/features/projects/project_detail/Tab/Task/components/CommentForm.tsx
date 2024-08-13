import { ActionIcon, Grid } from '@mantine/core';
import BaseTextInput from '../../../../../../components/Input/BaseTextInput';
import { TbSend } from 'react-icons/tb';
import { useForm } from '@mantine/form';

interface ICommentFormPropsType {
  onSubmit: (values: any) => void;
}

const CommentForm = ({ onSubmit }: ICommentFormPropsType) => {
  const commentForm = useForm({
    initialValues: {
      message: '',
    },
  });

  return (
    <form
      className="w-full absolute bottom-0"
      onSubmit={commentForm.onSubmit((values) => onSubmit(values))}
    >
      <Grid className="w-full" justify="center" align="center">
        <Grid.Col span={11}>
          <BaseTextInput
            placeholder="Tulis Pesan..."
            {...commentForm.getInputProps('message')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon
            type="submit"
            variant="filled"
            size={32}
            radius={'md'}
            className="bg-primary h-full"
          >
            <TbSend size={20} className=" h-full " color="white" />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default CommentForm;
