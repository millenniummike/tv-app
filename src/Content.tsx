import styled from 'styled-components';
import React, { useCallback, useState, useContext } from 'react';
import {
    useFocusable,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from './index';
import { ContentRow } from "./ContentRow";
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
    
    if (props.data)
    {
        contentData=props.data['pages'][props.page].page.content
    } else {
        
    }
    //let contentData = []
    const { setShowContent } = useContext(Context)
    

    const { ref, focusKey } = useFocusable();
    const defaultAssetSelected = {
        "title":"Default title",
        "backgroundImage":"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
        "description":"A really exciting description for this."
    }
    const [selectedAsset, setSelectedAsset] = useState(defaultAssetSelected);

    const onAssetPress = useCallback((asset: AssetProps) => {
        setShowContent(true);
    }, []);

    const onSelectAsset = useCallback((asset: AssetProps) => {
        setSelectedAsset(asset);
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

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                {selectedAsset ? <SelectedContent description={selectedAsset.description} backgroundImage={selectedAsset.backgroundImage} title={selectedAsset.title} color={''} width={''}></SelectedContent>:
                <SelectedContent description={''} backgroundImage={''} title={''} color={''} width={''}></SelectedContent>}
                
                <ScrollingRows ref={ref}>
                    {contentData.length > 0 ?
                        <div>
                            {contentData.map((value, index, array) => (
                                <ContentRow
                                    data={value.assets}
                                    key={value.title+index}
                                    title={value.title}
                                    description={value.description}
                                    onAssetPress={onAssetPress}
                                    onSelectAsset={onSelectAsset}
                                    onFocus={onRowFocus}
                                />
                            ))}
                        </div> : <div></div>
                    }
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

