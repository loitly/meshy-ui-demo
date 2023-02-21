import {Page} from './index';

export default function Main() {

    return (
        <Page>
            <p>
                Welcome to <em>Meshy-UI</em>!
            </p>

            <style jsx > {`
                p {
                    font-size: larger;
                    text-align: center;
                }
            `}</style>
        </Page>
    );
}
