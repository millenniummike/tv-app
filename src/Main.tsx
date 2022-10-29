import React, { Component, createContext } from 'react';
import { Menu } from "./Menu";
import { Content } from "./Content";
import styled, { createGlobalStyle } from 'styled-components';
import {
    init
} from './index';

import axios from "axios";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { Context } from './Context'

const queryClient = new QueryClient()

init({
    debug: false,
    visualDebug: false
});

// MOCK DATA
//data['pages'][page].page.content
const assetDataJson = {
    "base": {
        "pages": [
            {
                "page": {
                    "title": "Page title",
                    "content":[{
                    "title":"Content header",
                    "assets":[
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
                }]
                }
            },
            {
                "page": {
                    "title": "Page title",
                    "content":[{
                    "title":"Page 2 Content header",
                    "assets":[
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
                }]
                }
            }
        ]
    }
}

const assets = assetDataJson.base

const AppContainer = styled.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

import { App } from "./App";

export interface MainProps {
    app: App;
}

function DataContainer() {
    const { isLoading, error, data, refetch } = useQuery(["repoData"], () =>
        axios
            .get("https://stone-bronzed-river.glitch.me/data.json")
            .then((res) => res.data)
    );

    const [page, setPage] = React.useState(0)
    const [showContent, setShowContent] = React.useState(true)

    if (isLoading) return <div>Loading...</div>
    const showMenu = true;

    return <Context.Provider value={{ page, setPage, showContent, setShowContent }}>
    <AppContainer>
        <GlobalStyle />
        {showMenu ? <Menu focusKey='MENU' />:null}
        <ContentContainer>    
            <Content page={page} data={showContent?data:null} />
        </ContentContainer>
    </AppContainer>
    </Context.Provider>
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
        window.location.reload();
    }

    public reload(){
        window.location.reload();
    }


    public render() {
        if (this.state.hasError) {
            return <div><h1>Sorry.. there was an error</h1>
            <button onClick={this.reload}>Refresh Page</button>
            </div>;
        }

        return this.props.children;
    }
}
