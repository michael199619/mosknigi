import {FC} from 'react'
import {IBook} from '@/types/book'
import BookItem from './BookItem'
import styles from './BookList.module.sass'

interface IProps {
    books: IBook[]
}

const BookList: FC<IProps> = ({books}) => {
    return (
        <div className={styles.Wrapper}>
            {books.map(book => <BookItem book={book} key={book.id}/>)}
        </div>
    )
}

export default BookList