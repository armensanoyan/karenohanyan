import { SiteContext } from '../provider/LanguageProvider'

export function WorksPage(props) {
    const img = props.img
    let img_tag = ''
    let img_data = ''
  
    if (img) {
      img_tag = <img 
        className="img" 
        src={require(`../images/large/${img.fileName}`).default} 
        alt={img.fileName}
      />
  
      img_data = <SiteContext.Consumer>
        {value => (
          <p className='img_data'>{img[`name_${value.i18.language}`]} - {img.size}</p>
        )}
      </SiteContext.Consumer>
    }
    return (
      <div className='img_box'>
          <div className="arrow arrow_left" onClick={props.handleBack}><h1>&#8249;</h1></div>
          <div className='img_container'>
            {img_tag}
            {img_data}
          </div>
          <div className="arrow arrow_right" onClick={props.handleRight}><h1>&#8250;</h1></div>
      </div>
    )
  }