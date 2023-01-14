import React, { ReactElement, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import {
  BELL_SELECTED_ICON,
  BELL_UNSELECTED_ICON,
  DEFAULT_ICON,
} from '../lib/constants';

interface DotoriInputBox {
  title: string;
  description: string;
  image: string;
  remind: boolean;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleRemind: () => void;
}

function DotoriInputBox({
  image,
  title,
  description,
  onChangeDescription,
  onChangeTitle,
  remind,
  onToggleRemind,
}: DotoriInputBox): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = '62px'; // textarea 라이브러리가 초기 값을 인라인 css로 강제로 설정해논걸 없애기 위해서 이 방식 썼음
    }
  }, []);

  return (
    <DotoriInputBoxStyled>
      <ImageBox>
        {image ? (
          <Image src={image} alt="썸네일" />
        ) : (
          <DefaultImage>
            <img src={DEFAULT_ICON} alt="기본 이미지" />
          </DefaultImage>
        )}
      </ImageBox>
      <TitleInput
        ref={inputRef}
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={onChangeTitle}
      />

      <DescriptionInput
        ref={descriptionRef}
        placeholder="내용을 입력하세요"
        value={description}
        onChange={onChangeDescription}
      />
      <ReminderBox>
        <RemindText>리마인드 on/off</RemindText>

        <RemindImgBox remind={remind} onClick={onToggleRemind}>
          <RemindImage
            src={remind ? BELL_SELECTED_ICON : BELL_UNSELECTED_ICON}
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

const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8ffed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleInput = styled.input`
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 12px 6px 8px;
  outline: none;
  margin-bottom: 8px;
`;

const DescriptionInput = styled(TextareaAutosize)`
  resize: none;
  outline: none;
  width: 100%;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 5px 12px 6px 8px;
  font-family: 'Noto Sans KR', sans-serif;
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
