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

const ContentWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
    
    if (props.data)
    {
        contentData=props.data['pages'][props.page].page.content
        spinnerData=props.data['spinner'][props.page].page.content
    } else {
        
    }
    //let contentData = []
    const { setShowContent, setPage } = useContext(Context)
    

    const { ref, focusKey } = useFocusable();
    const defaultAssetSelected = {
        "title":"Default title",
        "backgroundImage":"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
        "description":"A really exciting description for this."
    }
    const [selectedAsset, setSelectedAsset] = useState(null);

    const onAssetSpinnerPress = (asset: AssetProps) => {
        //alert ("pressed spinner asset");
        setPage(1);
        setShowContent(false);
        
    };

    const onAssetPress = (asset: AssetProps) => {
        //alert ("pressed asset");
        setPage(0);
        setShowContent(true);
        window.location.reload();
        
    };

    const onSelectAsset = (asset: AssetProps) => {
        if (props.page==0){
            setSelectedAsset(asset);
        }
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

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                {selectedAsset ? <SelectedContent description={selectedAsset.description} backgroundImage={selectedAsset.backgroundImage} title={selectedAsset.title} color={''} width={''}></SelectedContent>:<div></div>}
                
                <ScrollingRows ref={ref}>
                        <div>
                            {spinnerData.map((value, index, array) => (
                                <SpinnerRow
                                    data={value.assets}
                                    height={selectedAsset ? "200px":"600px"}
                                    key={value.title+index}
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
                                    key={value.title+index}
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
}

