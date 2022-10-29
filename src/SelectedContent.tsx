import styled from 'styled-components';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    useFocusable,
    FocusContext
} from './index';

interface SelectedItemBoxProps {
    backgroundImage: string;
}

interface AssetProps {
  title: string;
  color: string;
  width: string;
  backgroundImage: string;
  description: string;
}

const SelectedItemWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

const SelectedItemBox = styled.div<SelectedItemBoxProps>`
    height: 482px;
    margin-left: 932px;
    width: 852px;
    background-image: url('${({ backgroundImage }) => backgroundImage}');
    background-color: ${({ color }) => color};
    margin-bottom: 37px;
    border-radius: 7px;
  `;

const SelectedItemCard = styled.div`
    position:absolute;
    text-align:left;
    padding:8px;
    left: 90px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `;

const SelectedItemTitle = styled.div`
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `;

  const SelectedItemText= styled.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: white;
    font-size: 32px;
    font-weight: 400;
    font-family: 'Arial';
  `;

  const SelectedItemSubText= styled.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: grey;
    font-size: 28px;
    font-weight: 400;
    font-family: 'Arial';
  `;

export const SelectedContent = ({color,backgroundImage,title,description} : AssetProps) => {
    return <SelectedItemWrapper>
    <SelectedItemBox
        color={color ? 'red' : '#565b6b'}
        backgroundImage={backgroundImage ? backgroundImage : ''}
    />
    <SelectedItemCard>
    <SelectedItemTitle>
    {title ? title:"Default selected title"}
        <SelectedItemText>
        {description ? description:"Default selected title"}
        </SelectedItemText>
        <SelectedItemSubText>
        "2nd item of text"
        </SelectedItemSubText>
    </SelectedItemTitle>
    </SelectedItemCard>
</SelectedItemWrapper>
}