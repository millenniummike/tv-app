import React, { Component, useCallback, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOMClient from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Menu } from "./Menu";
import styled, { createGlobalStyle } from 'styled-components';
import {
    useFocusable,
    init,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from './index';


import axios from "axios";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

  const queryClient = new QueryClient()

init({
    debug: true,
    visualDebug: false
  });

let page = 0

// MOCK DATA
const assetDataJson = {
    "base": [
        {
            "title": "Cool bets",
            "assets": [
                {
                    "title": "From Server",
                    "color": "#714ADD",
                    "backgroundImage": "https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
                    "width": "600px"
                },
                {
                    "title": "From Server",
                    "color": "#714ADD",
                    "backgroundImage": "https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
                    "width": "600px"
                },
                {
                    "title": "From Server",
                    "color": "#714ADD",
                    "backgroundImage": "https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
                    "width": "600px"
                },
                {
                    "title": "From Server",
                    "color": "#714ADD",
                    "backgroundImage": "https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",
                    "width": "600px"
                }
            ]
        }
    ]
}

const assets = assetDataJson.base

//

interface AssetData {
    title: string;
    color: string;
    width: string;
    backgroundImage: string;
    assets: [];
}[];

interface MenuItemBoxProps {
    focused: boolean;
}

interface AssetBoxProps {
    focused: boolean;
    color: string;
    width: string;
    backgroundImage: string;
}

interface AssetProps {
    title: string;
    color: string;
    width: string;
    backgroundImage: string;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (
        layout: FocusableComponentLayout,
        props: object,
        details: FocusDetails
    ) => void;
}

interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

interface SelectedItemBoxProps {
    backgroundImage: string;
}

interface ContentRowProps {
    data: AssetData[];
    title: string;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
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
  `;

const ContentTitle = styled.div`
    color: white;
    font-size: 48px;
    font-weight: 600;
    font-family: 'Arial';
    text-align: center;
    margin-bottom: 37px;
  `;

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

const SelectedItemTitle = styled.div`
    position: absolute;
    padding:8px;
    left: 32px;
    top:64px;
    color: white;
    font-size: 34px;
    font-weight: 400;
    font-family: 'Arial';
  `;

  const SelectedItemText= styled.div`
    position: absolute;
    padding:8px;
    left: 0px;
    color: white;
    font-size: 20px;
    font-weight: 400;
    font-family: 'Arial';
  `;

const ScrollingRows = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;


const ContentRowWrapper = styled.div`
    margin-bottom: 37px;
  `;

const ContentRowTitle = styled.div`
    color: white;
    margin-bottom: 22px;
    text-align: left;
    font-size: 27px;
    font-weight: 700;
    font-family: 'Arial';
    padding-left: 60px;
  `;

const ContentRowScrollingWrapper = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 60px;
  `;

const ContentRowScrollingContent = styled.div`
    display: flex;
    flex-direction: row;
  `;


const AssetBox = styled.div<AssetBoxProps>`
    width: ${({ width }) => width};
    height: 174px;
    background-image: url('${({ backgroundImage }) => backgroundImage}');
    background-size: cover;
    background-color: ${({ color }) => color};
    border-color: ${({ focused }) => (focused ? 'white' : 'black')};
    border-style: solid;
    border-width: ${({ focused }) => (focused ? '6px' : '6px')};
    box-sizing: border-box;
    border-radius: 7px;
  `;

const AssetTitle = styled.div`
    color: white;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `;

const AssetWrapper = styled.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;

const AppContainer = styled.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function Asset({ title, color, width, backgroundImage, onEnterPress, onFocus }: AssetProps) {
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        extraProps: {
            title,
            color,
            backgroundImage
        }
    });

    return (
        <AssetWrapper ref={ref}>
            <AssetBox width={width} backgroundImage={backgroundImage} color={color} focused={focused}>
            </AssetBox>
            <AssetTitle>{title}</AssetTitle>
        </AssetWrapper>
    );
}

function ContentRow({
    data: data,
    title: rowTitle,
    onAssetPress,
    onFocus
}: ContentRowProps) {
    const { ref, focusKey } = useFocusable({
        onFocus
    });

    const scrollingRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const onAssetFocus = useCallback(
        ({ x }: { x: number }, asset: AssetProps) => {
            onAssetPress(asset, null)
            scrollingRef.current.scrollTo({
                left: x,
                behavior: 'smooth'
            });
        },
        [scrollingRef]
    );

    //debugger

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentRowWrapper ref={ref}>
                <ContentRowTitle>{rowTitle}</ContentRowTitle>
                <ContentRowScrollingWrapper ref={scrollingRef}>
                    <ContentRowScrollingContent>
                        {data.map(({ title, color, backgroundImage, width }) => (
                            <Asset
                                backgroundImage={backgroundImage}
                                width={width}
                                key={title}
                                title={title}
                                color={color}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </ContentRowScrollingContent>
                </ContentRowScrollingWrapper>
            </ContentRowWrapper>
        </FocusContext.Provider>
    );
}

function Content({data:data}) {
    let contentData = data['pages'][page].page.content

    const { ref, focusKey } = useFocusable();
    const [selectedAsset, setSelectedAsset] = useState(null);

    const onAssetPress = useCallback((asset: AssetProps) => {
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

    //debugger
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                <SelectedItemWrapper>
                    <SelectedItemBox
                        color={selectedAsset ? selectedAsset.color : '#565b6b'}
                        backgroundImage={selectedAsset ? selectedAsset.backgroundImage : ''}
                    />
                    <SelectedItemTitle>
                    {selectedAsset
                            ? <div>{selectedAsset.title}</div>
                            : <div></div>
                        }
                        <SelectedItemText>
                            Some text
                        </SelectedItemText>
                        
                    </SelectedItemTitle>
                </SelectedItemWrapper>
                <ScrollingRows ref={ref}>
                    {contentData.length > 0 ?
                        <div>
                            {contentData.map((value, index, array) => (
                                <ContentRow
                                    data={value.assets}
                                    key={value.title}
                                    title={value.title}
                                    onAssetPress={onAssetPress}
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

import { App } from "./App";

export interface MainProps {
    app: App;
}

function DataContainer() {
    const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    axios
      .get("https://stone-bronzed-river.glitch.me/data.json")
      .then((res) => res.data)
  );
  if (isLoading) return <div>Loading...</div>

    return <AppContainer>
    <GlobalStyle />
    <Menu focusKey='MENU' />
    <Content data={data}/>
</AppContainer>
}

interface MainState {
}

export class Main extends Component<MainProps, MainState>
{
    constructor(props: MainProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <ErrorBoundary>
                <DataContainer></DataContainer>
                </ErrorBoundary>
            </React.StrictMode>
            </QueryClientProvider>
        );
    }
}

import { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    alert(error)
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
