import webpImg from '../../assets/main.webp';
import jpgpImg from '../../assets/main.jpg';

const MainPage = () => {
    return (
        <>
            <h1>Welcome to the main page</h1>
            <picture>
                <source type='image/webp' srcSet={webpImg} />
                <img src={jpgpImg} alt='main' />
            </picture>
        </>
    );
};

export default MainPage;
