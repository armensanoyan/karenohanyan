import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import './App.css';
import { transtationObject } from './translations/translations'
import { MenuBar } from './menu/Menu.js'
import { LanguageProvider } from './provider/LanguageProvider'
import { yearsCounter } from './data/index'
import {
  HomePage, 
  ExhibitionsPage,
  BiographyPage,
  ArticlesPage,
  WorksPage,
  ContactsPage,
} from './pages/pages.js'
import { album_list } from "./data/albums.data";
import * as all_images from './data/images.data'
import { NavBar } from "./menu/NavBar";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(transtationObject);


function App() {
  
  const pathname = window.location.pathname.split('/')[1]
  const { t } = useTranslation();
  const images = pathname.includes('20') ? getAlbum(pathname) : {}
  let [albumState, setAlbumState] = useState(images)
  let [imgState, setImgState] = useState(0)
  
  // In case of realoding or reopening site, on works page, display works/albums 
  // should display the images in album
  useEffect( () => {
    if (pathname.includes('20')) {
      document.getElementById('works').style.display = 'block' 
    } else {
      document.getElementById('works').style.display = 'none' 
    }
  })
  
  function getAlbum(years) {
    const years_array = years.split('-')
    const imgs = years_array.length > 1 ? yearsCounter.byYears(years_array) : yearsCounter.byYear(years_array)
    return imgs
  }

  // move to MenuPage
  function handleAlbum(years) {
    setAlbumState(getAlbum(years))
  }
  
  // move to Album component
  function handleImage(e) {
    setImgState(e.target.id)
  }
  
  // move to WorksPage
  function handleBack(e) {
    if (imgState > 0) {
      setImgState(imgState-1)
    } else {
      setImgState(albumState.length-1)
    }
  }
  // move to WorksPage
  function handleRight(e) {
    if (imgState < albumState.length - 1) {
      setImgState(imgState+1)
    } else {
      setImgState(0)
    }
  }

  function getDefaultImage(album) {
    // use find inplace of filter
    const  img = all_images.default.filter( image => image.fileName.includes(album.defaultImage) )[0]
    return img
  }
  
  return (
    <div className="grid_body">
    <LanguageProvider language='en'>
    <Router>
      <NavBar />
      <MenuBar 
        handleAlbum = {handleAlbum}
      />

      <Switch>
        {album_list.map( (album) => {
          return (
            <Route path={`/${album.href}`} className='img_box'> 
              <WorksPage 
                img={albumState[imgState] ? albumState[imgState] : getDefaultImage(album)}
                handleRight={handleRight}
                handleBack={handleBack}
                album={album}
              />
            </Route>
          )
        })}
        <Route path={`/${t('menu.contacts')}`} className='img_box'> <ContactsPage /></Route>
        <Route path={`/${t('menu.biography')}`} className='img_box'><BiographyPage /></Route>
        <Route path={`/${t('menu.exhibitions')}`} className='img_box'><ExhibitionsPage /></Route>
        <Route path={`/${t('menu.articles')}`} className='img_box'><ArticlesPage /></Route>
        <Route exact path='/' className='img_box'><HomePage/></Route>
      </Switch>
    </Router>

    <Album imgs={albumState} handleImage={handleImage}/>
    </LanguageProvider>
    </div>
  )
}

function Album(props) {
  let img_list = ''
  if (Array.isArray(props.imgs)) {
    img_list = props.imgs.map( (img, index) => {
      return (
        <img 
          key={index} 
          src={require(`./images/thumb/${img.fileName}`).default} 
          alt={img.fileName}
          id={index}
          className='album_img'
          onClick={props.handleImage}
        />
      )
    }) 
  }

  return (
    <div className='album_box' id='album_box'>
      {img_list}
    </div>
  )
}
export default App;
