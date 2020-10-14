import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, SAPPER_MODE, SESSION_SECRET } = process.env;
const dev = NODE_ENV === 'development';

let server = polka();
let sapperConfig = {};

if (SAPPER_MODE !== 'export') {
	const FileStore = new sessionFileStore(session);

	server.use(
		json(),
		session({
			secret: SESSION_SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000
			},
			store: new FileStore({
				path: `.sessions`
			})
		})
	);

	sapperConfig = {
		session: (req, res) => {
			return ({
				token: req.session.token
			})}
	};
}

server.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware(sapperConfig)
);

server.listen(PORT, err => {
	if (err) console.log('error', err);
});
