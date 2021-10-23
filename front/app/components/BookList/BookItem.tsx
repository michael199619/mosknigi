import {FC} from 'react'
import Link from 'next/link'
import styles from './BookItem.module.sass'
import {IBook} from '@/types/book'

interface IProps {
    book: IBook
}


const BookItem: FC<IProps> = ({book}) => {
    return (
        <div className={styles.Wrapper}>
            <Link href={`/books/${book.id}`}>
                <div className={styles.BookCoverWrapper}>
                    {book.cover && <img src={book.cover} className={styles.BookCover}/>}
                </div>
            </Link>
            <div className={styles.BookInfo}>
                <p className={styles.BookTitle}>{book.title}</p>
                <p className={styles.BookAuthor}>{book.author}</p>
            </div>
        </div>
    )
}

export default BookItem