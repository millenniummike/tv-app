import styled from 'styled-components';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    useFocusable,
    FocusContext
} from './index';

import { FaAppStore, FaArtstation } from 'react-icons/fa';

interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

interface SelectedItemBoxProps {
    backgroundImage: string;
}

interface MenuProps {
    focusKey: string;
}

interface MenuItemBoxProps {
    focused: boolean;
}

const NmLogo = styled.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `;

const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 32px;
    height: 32px;
    margin:16px;
    margin-bottom:32px;
    padding: 8px;
    border-color: white;
    background-color: ${({ focused }) =>
        focused ? '#0e4181' : '#4e4181'};
    border-radius: 7px;
  `;

const MenuWrapper = styled.div<MenuWrapperProps>`
    flex: 1;
    margin:12px;
    max-width: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '110px' : '110px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ hasFocusedChild }) =>
        hasFocusedChild ? '#000000' : '#000000'};
    padding-top: 37px;
    position:relative;
    height:1200px;
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

    return <MenuItemBox ref={ref} focused={focused}><FaArtstation /></MenuItemBox>;

    //return <MenuItemBox ref={ref} focused={focused}><MenuTitle>{props.title}</MenuTitle></MenuItemBox>;
}

export function Menu({ focusKey: focusKeyParam }: MenuProps) {
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

            } catch (error) {
                console.log('error', error);
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