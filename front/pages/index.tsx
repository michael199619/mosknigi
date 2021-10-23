import type {NextPage} from 'next'
import styles from '@/styles/Home.module.sass'
import BookList from '@/components/BookList/BookList'

const Home: NextPage = () => {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.WeSearchedWrapper}>
                <h1 className={styles.WeSearchedTitle}>МЫ ИСКАЛИ...</h1>
                <p className={styles.WeSearchedText}>и нашли несколько книг специально
                    <br/>
                    <span className={styles.WeSearchedTextBold}> для вас</span>
                </p>
            </div>
            <BookList books={[
                {
                    author: 'Рейчел Липпинкотт',
                    id: 0,
                    title: 'В метре друг от друга',
                    favorite: false,
                    cover: 'https://cv7.litres.ru/pub/c/elektronnaya-kniga/cover_415/64060372-aleksey-ivanov-teni-tevtonov.jpg'
                },
                {
                    author: 'Рейчел Липпинкотт',
                    id: 1,
                    title: 'В метре друг от друга',
                    favorite: false
                },
                {
                    author: 'Рейчел Липпинкотт',
                    id: 2,
                    title: 'В метре друг от друга',
                    favorite: false
                },
                {
                    author: 'Рейчел Липпинкотт',
                    id: 3,
                    title: 'В метре друг от друга',
                    favorite: false
                },
                {
                    author: 'Рейчел Липпинкотт',
                    id: 4,
                    title: 'В метре друг от друга',
                    favorite: false
                }
            ]}/>
        </div>
    )
}

export default Home