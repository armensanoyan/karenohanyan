import {Link} from "react-router-dom";

import { album_list } from '../data/albums.data'

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
    <div className='menulist'>
          <div className="languages ">
            <ul className="languagelist">
                <li id='en' className="language eng" onClick={props.handleLanguage}> ENG</li>
                <li id='ru' className="language ru" onClick={props.handleLanguage}> РУ</li>
                <li id='arm' className="language arm" onClick={props.handleLanguage}>ՀԱՅ</li>
            </ul>
          </div>
          <ul>
            <li>
              <Link to='/' onClick={hideWorks}>{props.t('menu.home')}</Link>
            </li>
            <li style={{cursor: "pointer"}} onClick={displayWorks}>
                {props.t('menu.work')}
            </li>
            <li>
                <Works t={props.t} handleAlbum={props.handleAlbum}/>
            </li>
            <li>
              <Link to={props.t('menu.articles')} onClick={hideWorks}>{props.t('menu.articles')}</Link>
            </li>
            <li>
              <Link to={props.t('menu.biography')} onClick={hideWorks}>{props.t('menu.biography')}</Link>
            </li>
            <li>
              <Link to={props.t('menu.exhibitions')} onClick={hideWorks}>{props.t('menu.exhibitions')}</Link>
            </li>
            <li>
              <Link to={props.t('menu.contacts')} onClick={hideWorks}>{props.t('menu.contacts')}</Link>
            </li>
          </ul>
        </div>
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