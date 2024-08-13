import { FileButton, FileInputProps, Input, Stack, Text } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';

interface IFileUploadIcon extends FileInputProps {
  setFileUpload: Dispatch<SetStateAction<File | null>>;
}

const FileUploadIcon = ({ setFileUpload, ...props }: IFileUploadIcon) => {
  return (
    <FileButton
      onChange={setFileUpload}
      accept="image/png, image/jpg, image/svg"
      {...props}
    >
      {(props) => (
        <Input.Wrapper
          label="Project Icon"
          classNames={{
            label: `mb-2.5`,
          }}
          withAsterisk
        >
          <Stack
            align="center"
            justify="center"
            className="w-full h-full border-2 border-neutral-300 rounded-lg px-5 py-8 border-dashed"
            {...props}
          >
            <BsFileEarmarkArrowDown className="w-20 h-20 text-neutral-300" />

            <Text className="text-base text-neutral-400">
              Upload Project Icon
            </Text>
          </Stack>
        </Input.Wrapper>
      )}
    </FileButton>
  );
};

export default FileUploadIcon;
