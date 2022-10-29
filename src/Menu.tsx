import styled from 'styled-components';
import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
import {
    useFocusable,
    FocusContext
} from './index';

import { Context } from './Context'

import * as FontAwesome from "react-icons/fa";

const Icon = props => {
  const { iconName, size, color } = props;
  const icon = React.createElement(FontAwesome[iconName]);
  return <div style={{ fontSize: size, color: color }}>{icon}</div>;
};

const menuData = [
    {"title":"Menu1"},
    {"title":"Menu2"}
]

interface MenuWrapperProps {
    hasFocusedChild: boolean;
    menuHidden: boolean;
}

interface MenuProps {
    focusKey: string;
    menuHidden: boolean;
}

interface MenuItemProps {
    menuFocus: boolean;
    title: string;
    key:number;
}

interface MenuItemBoxProps {
    focused: boolean;
}

const MenuText = styled.div`
    text-align:center;
    padding:8px;
    color: white;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Arial';
  `;

const NmLogo = styled.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `;

const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 64px;
    height: 64px;
    margin: 24px;
    margin-bottom:8px;
    padding: 0px;
    border-color: white;
    background-color: ${({ focused }) =>
        focused ? '#0e4181' : '#000000'};
    border-radius: 7px;
  `;

const MenuWrapper = styled.div<MenuWrapperProps>`
    flex: 1;
    max-width: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '90px' : '90px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 37px;
    position:absolute;
    left:${({ menuHidden }) =>
    menuHidden ? '3000px' : '0px'};
    z-index:3;
  `;

function MenuItem(props:any) {

    const { setPage } = useContext(Context)
    const onMenuItemFocus = useCallback(

        (layout: any) => {
            
        }, null
    );

    const onMenuPress = useCallback(
        ( props: any) => {
            alert('menu press')
            //setPage(props.index)
        }, null
    );

        //debugger
    const { ref, focused} = useFocusable({ onFocus: onMenuItemFocus, onEnterPress: onMenuPress,
        extraProps: {
            index:props.index
        }});

    return <div><MenuItemBox ref={ref} focused={focused}>
         <Icon iconName={props.icon} size={64} color="#858585" />
         </MenuItemBox><MenuText>{props.title}</MenuText></div>;
}

export function Menu({ focusKey: focusKeyParam, menuHidden: menuHidden}: MenuProps) {
    const {
        ref,
        focusSelf,
        hasFocusedChild,
        focusKey,
        setFocus,
        // navigateByDirection, -- to manually navigate by direction
        // pause, -- to pause all navigation events
        // resume, -- to resume all navigation events
        // updateAllLayouts, -- to force update all layouts when needed
        // getCurrentFocusKey -- to get the current focus key
    } = useFocusable({
        focusable: true,
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: null,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true,
        onFocus: () => { },
        onBlur: () => { }
    });

    //** TODO work out fixed menu focus key */
    useEffect(() => {
        //focusSelf();
        setFocus("sn:focusable-item-52");
    }, [focusSelf]);
    

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://stone-bronzed-river.glitch.me/menu.json';

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log('error', error);
                setData(menuData)
            }
        };

        fetchData();
    }, []);

    //debugger

    return (
        <FocusContext.Provider value={focusKey}>
            <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild} menuHidden={menuHidden}>
                <NmLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU" />
                
                {data.length > 0 ?
                        <div>
                            {data.map((value, index, array) => (
                                hasFocusedChild ? 
                                <MenuItem icon={value.icon} key={index} index={index} menuFocus={hasFocusedChild} title={value.title} /> :
                                <MenuItem icon={value.icon} key={index} index={index} menuFocus={hasFocusedChild} title={''} />
                            ))}
                        </div> : <div></div>
                    }
            </MenuWrapper>
        </FocusContext.Provider>
    );
}