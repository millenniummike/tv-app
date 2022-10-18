import React, { Component, useCallback, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOMClient from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import {
    useFocusable,
    init,
    FocusContext,
    FocusDetails,
    FocusableComponentLayout,
    KeyPressDetails
} from './index';

import { FaAppStore, FaArtstation } from 'react-icons/fa';
import axios from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient,
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

const menuData = [
    {"title":"Menu1"},
    {"title":"Menu2"}
]
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

interface MenuProps {
    focusKey: string;
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
    width: 1074px;
    background-image: url('${({ backgroundImage }) => backgroundImage}');
    background-color: ${({ color }) => color};
    margin-bottom: 37px;
    border-radius: 7px;
  `;

const SelectedItemTitle = styled.div`
    position: absolute;
    bottom: 75px;
    left: 150px;
    color: white;
    font-size: 27px;
    font-weight: 400;
    font-family: 'Arial';
  `;

const ScrollingRows = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;

const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 64px;
    padding: 8px;
    background-color: ${({ focused }) => (focused ? '#50F050' : '#0056ed')};
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 7px;
  `;

const MenuWrapper = styled.div<MenuWrapperProps>`
    flex: 1;
    max-width: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '110px' : '110px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ hasFocusedChild }) =>
        hasFocusedChild ? '#4e4181' : '#362C56'};
    padding-top: 37px;
    position:relative;
    height:1200px;
  `;


const ContentRowWrapper = styled.div`
    margin-bottom: 37px;
  `;

const ContentRowTitle = styled.div`
    color: white;
    margin-bottom: 22px;
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

const NmLogo = styled.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `;

const MenuTitle = styled.div`
    color: white;
    padding:8px;
    width:64px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
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
  background-color: #221c35;
  width: 1920px;
  height: 890px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function MenuItem(props: any) {
    const onMenuItemFocus = useCallback(

        (x: any, asset: any) => {
            console.log("Menu focused")
            console.log(x)
            console.log(asset) /// ****** WHY!?!?
        }, null
    );
    const { ref, focused } = useFocusable({ onFocus: onMenuItemFocus });

    return <MenuItemBox ref={ref} focused={focused}><FaAppStore /></MenuItemBox>;

    //return <MenuItemBox ref={ref} focused={focused}><MenuTitle>{props.title}</MenuTitle></MenuItemBox>;
}

function Menu({ focusKey: focusKeyParam }: MenuProps) {
    const {
        ref,
        focusSelf,
        hasFocusedChild,
        focusKey
        // setFocus, -- to set focus manually to some focusKey
        // navigateByDirection, -- to manually navigate by direction
        // pause, -- to pause all navigation events
        // resume, -- to resume all navigation events
        // updateAllLayouts, -- to force update all layouts when needed
        // getCurrentFocusKey -- to get the current focus key
    } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: null,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true,
        onFocus: () => { },
        onBlur: () => { },
        extraProps: { foo: 'bar' }
    });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://stone-bronzed-river.glitch.me/menu.json';

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("**********")
                console.log(json);
                setData(json);
                //setData(assets)

            } catch (error) {
                console.log('error', error);
                setData(assets)
            }
        };

        fetchData();
    }, []);

    return (
        <FocusContext.Provider value={focusKey}>
            <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
                <NmLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU" />
                
                {data.length > 0 ?
                        <div>
                            {data.map((value, index, array) => (
                                hasFocusedChild ? 
                                <MenuItem menuFocus={hasFocusedChild} title={value.title} /> :
                                <MenuItem menuFocus={hasFocusedChild} title={value.title} />
                            ))}
                        </div> : <div></div>
                    }
            </MenuWrapper>
        </FocusContext.Provider>
    );
}

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
                <ContentTitle>What to Watch?</ContentTitle>
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
                        <div>Selected Item Text1</div>
                        <div>Selected Item Text2</div>
                        <div>Selected Item Text3</div>
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
