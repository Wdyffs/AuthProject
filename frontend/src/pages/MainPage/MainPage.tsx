import webpImg from '../../assets/main.webp';
import jpgImg from '../../assets/main.jpg';

const MainPage = () => {
    return (
        <section className='relative '>
            <h1 className='absolute z-20 w-full text-center text-white text-4xl mt-[20%]'><span className='inline-block'>Welcome to the main page</span></h1>
            <picture className='absolute z-10'>
                <source type='image/webp' srcSet={webpImg} />
                <img src={jpgImg} alt='main' />
            </picture>
        </section>
    );
};

export default MainPage;
