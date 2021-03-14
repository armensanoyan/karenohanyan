import { SiteContext } from '../providers/LanguageProvider'


export function NavBar() {
  function handleMenu() {
    document.querySelector('.hamburger').classList.toggle('active')
    document.querySelector('.menulist').classList.toggle('open')
  }

  return (
    <SiteContext.Consumer>
      {value => (
        <div className='nav_bar'>
          <h1 className='heroname'>{value.t('name')}</h1>
          <div onClick={handleMenu} className="hamburger">
            <div className="line" id="bulk"></div>
          </div>
        </div>
      )}
    </SiteContext.Consumer>
  )
}