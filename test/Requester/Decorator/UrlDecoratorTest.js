import { @dataProvider } from '@jymfony/decorators';
import { createRequest } from '../../../lib/Requester/Request';
import { expect } from 'chai';

const TestCase = Jymfony.Component.Testing.Framework.TestCase;
const UrlDecorator = Solido.Atlante.Requester.Decorator.UrlDecorator;

export default class UrlDecoratorTest extends TestCase {
    testNewInstanceIsReturned() {
        const decorator = new UrlDecorator('http://localhost/');
        const request = createRequest('GET', 'http://localhost/foo');
        const decorated = decorator.decorate(request);

        expect(decorated).to.be.deep.equal(request);
        expect(decorated).to.be.not.equal(request);
    }

    @dataProvider('provideDecorateCases')
    testDecorate(baseUrl, url, expected) {
        const decorator = new UrlDecorator(baseUrl);
        const decorated = decorator.decorate(createRequest('GET', url));

        expect(decorated.url).to.be.equal(expected);
    }

    * provideDecorateCases() {
        yield ['http://api.example.test', '/foo', 'http://api.example.test/foo'];
        yield ['https://api.example.com', '/foo', 'https://api.example.com/foo'];

        yield ['http://api.example.test/', 'http://localhost/foo/', 'http://localhost/foo/'];
        yield ['https://api.example.com/foo/', 'bar', 'https://api.example.com/foo/bar'];
        yield ['https://api.example.com/foo', 'bar', 'https://api.example.com/bar'];
        yield ['https://api.example.com/foo', '/bar', 'https://api.example.com/bar'];
        yield ['https://api.example.com', 'foo', 'https://api.example.com/foo'];

        yield ['http://api.example.test/foo?test=1', '/foo', 'http://api.example.test/foo'];
        yield ['http://api.example.test/foo?test=1', '/foo?test=2&c=a', 'http://api.example.test/foo?test=2&c=a'];

        yield ['http://api.example.test/foo/#frag', 'bar', 'http://api.example.test/foo/bar'];
        yield ['http://api.example.test/foo/', 'bar#frag', 'http://api.example.test/foo/bar#frag'];
        yield ['http://api.example.test/foo/#no-frag', 'bar#frag', 'http://api.example.test/foo/bar#frag'];
        yield ['http://api.example.test/foo/#no-frag', '/bar#frag', 'http://api.example.test/bar#frag'];
    }
}
