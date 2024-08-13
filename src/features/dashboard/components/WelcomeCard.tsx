import { Card, Group, Stack, Text, Image } from '@mantine/core';
// import Image from 'next/image';
import { COLORS } from '../../../constant/colors';
import { ILWelcomeCard } from '../../../assets/illustration';
import { ICHand } from '../../../assets/icons/hand.icon';

interface IWelcomeCard {
  name: string;
}

const WelcomeCard = ({ name }: IWelcomeCard) => {
  return (
    <Card
      className="w-full h-fit"
      p={25}
      bg={COLORS.primary}
      radius={'lg'}
      shadow="md"
    >
      <Group>
        <Image
          src={ILWelcomeCard.src}
          alt="Daily Task management Illustrations"
          width={150}
          height={150}
          className="w-[150px] h-[150px]"
        />
        <div>
          <Group gap={7} align="flex-start">
            <Text fz={'1.25rem'} fw={500} color="white">
              Hi, {name}
            </Text>
            <ICHand width={25} height={25} />
          </Group>
          <Text fz={'1.25rem'} color="white" mt={5}>
            You can easily manage your <br /> projects and teams with us
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default WelcomeCard;
