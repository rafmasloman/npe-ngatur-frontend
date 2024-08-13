import {
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';

const LoadingPage = () => {
  return (
    <Container fluid className="min-h-screen mt-10 md:mt-16">
      <Stack gap={0} align="center" justify="center" className="w-full h-full">
        <Text className="text-center text-lg md:text-xl" ff={'poppins'}>
          Loading ....{' '}
        </Text>
        <Loader size={25} type="dots" />
      </Stack>
    </Container>
  );
};

export default LoadingPage;
