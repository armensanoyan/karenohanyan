import {Link} from "react-router-dom";

import { album_list } from '../data/albums.data'
import { SiteContext } from '../provider/LanguageProvider'

export function MenuBar(props) {

  function displayWorks() {
    document.getElementById('works').style.display = 'block'
    document.getElementById('album_box').style.display = 'flex'
  }

  function hideWorks() {
    document.getElementById('works').style.display = 'none'
    document.getElementById('album_box').style.display = 'none'
  }

    return (
    <SiteContext.Consumer> 
      { value => (
        <div className='menulist'>
          <div className="languages ">
            <ul className="languagelist">
              <li id='en' className="language eng" onClick={value.setLanguage}>ENG</li>
              <li id='ru' className="language ru" onClick={value.setLanguage}>РУ</li>
              <li id='hy' className="language hy" onClick={value.setLanguage}>ՀԱՅ</li>
            </ul>
          </div>
          <ul>
            <li>
              <Link to='/' onClick={hideWorks}>{value.t('menu.home')}</Link>
            </li>
            <li style={{cursor: "pointer"}} onClick={displayWorks}>
                {value.t('menu.work')}
            </li>
            <li>
                <Works t={value.t} handleAlbum={props.handleAlbum}/>
            </li>
            <li>
              <Link to={value.t('menu.articles')} onClick={hideWorks}>{value.t('menu.articles')}</Link>
            </li>
            <li>
              <Link to={value.t('menu.biography')} onClick={hideWorks}>{value.t('menu.biography')}</Link>
            </li>
            <li>
              <Link to={value.t('menu.exhibitions')} onClick={hideWorks}>{value.t('menu.exhibitions')}</Link>
            </li>
            <li>
              <Link to={value.t('menu.contacts')} onClick={hideWorks}>{value.t('menu.contacts')}</Link>
            </li>
          </ul>
        </div>
      )} 
    </SiteContext.Consumer> 
  )
}

function Works(props) {
    
    return (
    <div>
        <ul id='works'>
            {album_list.map((album, index) => {
                return (
                    <li key={index}>
                        <Link 
                            to={`/${album.href}`}
                            onClick={ () => props.handleAlbum(album.href) }
                        >
                            {props.t('album.'+album.href)}
                        </Link>
                    </li>)
            })}
        </ul>
    </div>
    )
  }