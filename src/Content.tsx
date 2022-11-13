import styled from 'styled-components';
import React, { useCallback, useState, useContext, useEffect, useRef } from 'react';
import {
    useFocusable,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from './index';
import { ContentRow } from "./ContentRow";
import { SpinnerRow } from "./SpinnerRow";
import { SelectedContent } from "./SelectedContent";

import { Context } from './Context'

interface AssetProps {
    title: string;
    description: string;
    color: string;
    width: string;
    backgroundImage: string;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    onSelectAsset: (props: object) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

const HiddenWrapper = styled.div`

`;

const NormalWrapper = styled.div`

`;


const VideoContainer = styled.video`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  position:absolute;
`;

const ContentWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-left:16px;
  `;

const ScrollingRows = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;

export function Content(props: any) {

    let contentData = []
    let spinnerData = []

    if (props.data && props.page < 2) {
        contentData = props.data['pages'][props.page].page.content
        spinnerData = props.data['spinner'][props.page].page.content
    } else {

    }
    const { setshowMenu, setPage, page } = useContext(Context)
    const { ref, focusKey, focusSelf, getCurrentFocusKey, setFocus } = useFocusable({
        saveLastFocusedChild: true
    });

    let pageRef = useRef(0);
    let previousFocusKeyRef = useRef("");
    // Add event listeners

    useEffect(() => {

        // **TODO handle through main key press handler
        const keyDown = ({ key }) => {
            alert(key)
            if (key == "Backspace" || key == "XF86Back") {
                alert("Back")
                let toPage = pageRef.current;
                toPage--;
                if (toPage < 0) { toPage = 0; }
                setPage(toPage);
                pageRef.current = toPage;
            }
        }
        window.addEventListener("keydown", keyDown);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keyDown);
        };
    }, []);

    const [selectedAsset, setSelectedAsset] = useState(null);

    const onAssetSpinnerPress = (asset: AssetProps) => {

        if (props.page == 0) {
            setPage(1);
            pageRef.current = 1;
            previousFocusKeyRef.current = getCurrentFocusKey();
            setFocus("spinner:0");
        } else {
            // show video page
            setPage(2);
            pageRef.current = 2;
            previousFocusKeyRef.current = getCurrentFocusKey();
        }
    };

    const onAssetPress = useCallback((asset: AssetProps) => {
        if (props.page == 0) {
            setPage(1);
            pageRef.current = 1;
            previousFocusKeyRef.current = getCurrentFocusKey();
            setFocus("spinner:0");
        } else {
            // show video page
            setPage(2);
            pageRef.current = 2;
            previousFocusKeyRef.current = getCurrentFocusKey();
        }
    }, []);

    const onSelectAsset = (asset: AssetProps) => {
        setSelectedAsset(asset);
    };

    const onSelectSpinnerAsset = useCallback((asset: AssetProps) => {
        setSelectedAsset(null)
    }, []);

    const onRowFocus = useCallback(
        ({ y }: { y: number }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        },
        [ref]
    );

    switch (props.page) {
        case 0:
            return (
                <FocusContext.Provider value={focusKey}>
                    {props.page == 2 ? <VideoContainer id="video" src="http://techslides.com/demos/sample-videos/small.mp4" loop autoPlay preload="auto"></VideoContainer> : null}
                    <ContentWrapper>
                        {selectedAsset ? <SelectedContent description={selectedAsset.description} backgroundImage={selectedAsset.backgroundImage} title={selectedAsset.title} color={''} width={''}></SelectedContent> : <div></div>}
                        <ScrollingRows ref={ref}>
                            <div>
                                {spinnerData.map((value, index, array) => (
                                    <SpinnerRow
                                        data={value.assets}
                                        height={selectedAsset ? "200px" : "600px"}
                                        key={value.title + index}
                                        title={value.title}
                                        description={value.description}
                                        onAssetPress={onAssetSpinnerPress}
                                        onSelectAsset={onSelectSpinnerAsset}
                                        onFocus={onRowFocus}
                                    />
                                ))}
                                {contentData.map((value, index, array) => (
                                    <ContentRow
                                        height={"200px"}
                                        data={value.assets}
                                        key={value.title + index}
                                        title={value.title}
                                        description={value.description}
                                        onAssetPress={onAssetPress}
                                        onSelectAsset={onSelectAsset}
                                        onFocus={onRowFocus}
                                    />
                                ))}
                            </div>
                        </ScrollingRows>
                    </ContentWrapper>
                </FocusContext.Provider>
            );
        case 1:
            return (
                <FocusContext.Provider value={focusKey}>
                    <ContentWrapper>
                        {selectedAsset ? <SelectedContent description={selectedAsset.description} backgroundImage={selectedAsset.backgroundImage} title={selectedAsset.title} color={''} width={''}></SelectedContent> : <div></div>}
                        <div>Specific Selected Content</div>
                        <ScrollingRows ref={ref}>
                            <div>
                                {spinnerData.map((value, index, array) => (
                                    <SpinnerRow
                                        data={value.assets}
                                        height={selectedAsset ? "200px" : "600px"}
                                        key={value.title + index}
                                        title={value.title}
                                        description={value.description}
                                        onAssetPress={onAssetSpinnerPress}
                                        onSelectAsset={onSelectSpinnerAsset}
                                        onFocus={onRowFocus}
                                    />
                                ))}
                                {contentData.map((value, index, array) => (
                                    <ContentRow
                                        height={"200px"}
                                        data={value.assets}
                                        key={value.title + index}
                                        title={value.title}
                                        description={value.description}
                                        onAssetPress={onAssetPress}
                                        onSelectAsset={onSelectAsset}
                                        onFocus={onRowFocus}
                                    />
                                ))}
                            </div>
                        </ScrollingRows>
                    </ContentWrapper>
                </FocusContext.Provider>
            );
        case 2:
            return (
                <FocusContext.Provider value={focusKey}>
                    <VideoContainer id="video" src="http://techslides.com/demos/sample-videos/small.mp4" loop autoPlay preload="auto"></VideoContainer>
                </FocusContext.Provider>
            );
    }
}

