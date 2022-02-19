import React, { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DotoriInputBox {
  title: string;
  image: string;
  remind: boolean;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleRemind: () => void;
}

function DotoriInputBox({
  image,
  title,
  onChangeTitle,
  remind,
  onToggleRemind,
}: DotoriInputBox): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <DotoriInputBoxStyled>
      <ImageBox>
        <Image src={image} />
      </ImageBox>
      <TitleInput
        ref={inputRef}
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={onChangeTitle}
      />
      <ReminderBox>
        <RemindText>리마인드 on/off</RemindText>

        <RemindImgBox remind={remind} onClick={onToggleRemind}>
          <RemindImage
            src={
              remind
                ? 'https://i.ibb.co/XSrKhLZ/Bell-selected.png'
                : 'https://i.ibb.co/X4VYcPH/Bell-unselected.png'
            }
          />
          <span>{remind ? 'on' : 'off'}</span>
        </RemindImgBox>
      </ReminderBox>
    </DotoriInputBoxStyled>
  );
}

const DotoriInputBoxStyled = styled.div`
  margin: 24px;
  width: 150px;
`;

const ImageBox = styled.div`
  margin-bottom: 16px;
  width: 150px;
  height: 92px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleInput = styled.input`
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 12px 6px 8px;
  outline: none;
`;

const ReminderBox = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RemindText = styled.span`
  font-size: 10px;
  color: #323232;
`;

const RemindImgBox = styled.div<{ remind: boolean }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  color: ${({ remind }) => (remind ? '#48bf91' : '#aaaaaa')};
`;

const RemindImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;

export default DotoriInputBox;
