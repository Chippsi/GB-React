import { Card, CardContent, Typography } from "@material-ui/core"
import { v4 as uuidv4 } from 'uuid'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch, useSelector } from "react-redux"
import { getError, getPosts, getStatus } from "../../store/posts/selectors"
import { getPostsThunk } from "../../store/posts/actions"
import { useCallback, useEffect } from "react"


function Posts() {
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const error = useSelector(getError)
    const status = useSelector(getStatus)

    const load = useCallback(() => dispatch(getPostsThunk()))
    const scrollHandler = useCallback((e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.clientHeight + e.target.documentElement.scrollTop) < 100) {
            load()
        }
    })

    useEffect(() => {
        !posts.length && load()
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [])

    return (
        <>
            <div style={{ color: '#fff' }}>
                {error ?
                    <>
                        <div style={{ color: '#fff', fontSize: '20px' }}>{error.message}</div>
                        <button style={{ alignSelf: 'flex-start' }} onClick={load}>Повторить запрос</button>
                    </>
                    :
                    <>
                        {
                            posts.map((post) => (
                                <Card key={uuidv4()} sx={{ maxWidth: 345, mt: 3, mb: 3 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </>
                }
                {status === 1 && <CircularProgress style={{ display: 'block', margin: '0 auto' }} />}
            </div>
        </>
    )
}

export default Posts
