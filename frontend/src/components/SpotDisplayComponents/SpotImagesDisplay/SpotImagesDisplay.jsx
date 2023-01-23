import './SpotImagesDisplay.css'
const SpotImagesDisplay = ({images}) => {

    let previewImage;
    if (images){
        previewImage = images.find(img => img.preview);
    };

    return(
        images ?
        <>
        <div className='spot-images-display-container'>
            <div className="preview-image-container">
                <img src={previewImage.url} alt="preview image" className='preview-image spot-image' />
            </div>
            <div className="spot-images-container">
                    <div className="spot-image-container">
                        <img className='spot-image' src={previewImage.url} alt="a house" />
                    </div>
                    <div className="spot-image-container">
                        <img className='spot-image' src={previewImage.url} alt="a house" />
                    </div>
                    <div className="spot-image-container">
                        <img className='spot-image' src={previewImage.url} alt="a house" />
                    </div>
                    <div className="spot-image-container">
                        <img className='spot-image' src={previewImage.url} alt="a house" />
                    </div>

            </div>
        </div>
        </>
        : <>Nothing to see here!</>

)};

export default SpotImagesDisplay;
