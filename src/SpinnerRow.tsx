import styled, { keyframes } from 'styled-components';
import React, { useCallback, useState, useRef } from 'react';
import {
    useFocusable,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from './index';

interface AssetData {
    title: string;
    description: string;
    color: string;
    width: string;
    height: string;
    backgroundImage: string;
    assets: [];
}[];

interface ContentRowProps {
    data: AssetData[];
    title: string;
    description: string,
    height: string,
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onSelectAsset: (props: object) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

interface AssetProps {
    title: string;
    description: string;
    color: string;
    width: string;
    height: string;
    backgroundImage: string;
    fadeIn: () => void;
    fadeOut: () => void;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

interface AssetBoxProps {
    focused: boolean;
    color: string;
    width: string;
    height: string;
    backgroundImage: string;
}

const ContentRowWrapper = styled.div`
    margin-bottom: 37px;
  `;

const AssetText = styled.div`
    color: white;
    margin:8px;
    margin-bottom: 22px;
    margin-left: 120px;
    text-align: left;
    font-size: 38px;
    font-weight: 700;
    font-family: 'Arial';
  `;

const ContentRowScrollingWrapper = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 0px;
  `;

const ContentRowScrollingContent = styled.div`
    display: flex;
    flex-direction: row;
 `;

 const fadeAnimateIn = keyframes`
 0% { opacity: 0}
 30% { opacity: 0.1; }
 50% { opacity: 1; }
`
const fadeAnimateOut = keyframes`
0% { opacity: 1}
30% { opacity: 0; }
100% { opacity: 0; }
`

const AssetBoxFadein = styled.div<AssetBoxProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-image: url('${({ backgroundImage }) => backgroundImage}');
    background-size: cover;
    background-color: ${({ color }) => color};
    box-sizing: border-box;
    border-radius: 7px;
    animation-name: ${fadeAnimateIn};
    animation-duration: 3s;
`;

const AssetBoxFadeout = styled.div<AssetBoxProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-image: url('${({ backgroundImage }) => backgroundImage}');
    background-size: cover;
    background-color: ${({ color }) => color};
    box-sizing: border-box;
    border-radius: 7px;
    animation-name: ${fadeAnimateOut};
    animation-duration: 2s;
`;

const AssetTitle = styled.div`
    color: white;
    margin:8px;
    margin-top: 10px;
    margin-left: 120px;
    font-family: 'Arial';
    font-size: 36px;
    font-weight: 400;
    text-align:left;
  `;

const AssetWrapper = styled.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;



  function Asset({ title, color, width, height, backgroundImage, description, onEnterPress, onFocus}: AssetProps) {
    const [transition, setTransition] = useState(false);
    const fadeIn = () => {
        setTransition(true);
    }
    const fadeOut = () => {
        setTransition(false);
    }
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        extraProps: {
            title,
            color,
            backgroundImage,
            description,
            fadeIn,
            fadeOut
        }
    });

    return (
        <AssetWrapper ref={ref}>
           {transition?<AssetBoxFadein width={width} height={height} backgroundImage={backgroundImage} color={color} focused={focused}>
            <AssetTitle>Asset Title</AssetTitle>
            <AssetText>Asset text</AssetText>
            </AssetBoxFadein>:
            <AssetBoxFadeout width={width} height={height} backgroundImage={backgroundImage} color={color} focused={focused}>
            <AssetTitle>Asset Title</AssetTitle>
            <AssetText>Asset text</AssetText>
            </AssetBoxFadeout>}
        </AssetWrapper>
    );
}

export function SpinnerRow({
    description: description,
    data: data,
    title: rowTitle,
    height: height,
    onAssetPress,
    onSelectAsset,
    onFocus
}: ContentRowProps) {
    const { ref, focusKey } = useFocusable({
        onFocus
    });

    const fadeIn = () => {
    }
    const fadeOut = () => {}

    const scrollingRef = useRef(null);
    let previousAsset = null;
    const onAssetFocus = useCallback(
        ({ x }: { x: number }, asset: AssetProps) => {
            if (previousAsset) {
               previousAsset.fadeOut();
            }
            previousAsset = asset;
            onSelectAsset(asset)
            if (scrollingRef.current.scrollLeft!=x){
                asset.fadeIn();
                scrollingRef.current.scrollTo({
                    left: x,
                    behavior: 'smooth'
                });
            }
        },
        [scrollingRef]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentRowWrapper ref={ref}>
                <ContentRowScrollingWrapper ref={scrollingRef}>
                    <ContentRowScrollingContent>
                        {data.map(({ title, description, color, backgroundImage, width},index) => (
                           <Asset
                                backgroundImage={height=="200px"?"":backgroundImage}
                                description={description}
                                height={height}
                                width={width}
                                key={title+index}
                                title={title}
                                color={height=="200px"?"":color}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                                fadeIn={fadeIn}
                                fadeOut={fadeOut}
                            />
                        ))}
                    </ContentRowScrollingContent>
                </ContentRowScrollingWrapper>
            </ContentRowWrapper>
        </FocusContext.Provider>
    );
}