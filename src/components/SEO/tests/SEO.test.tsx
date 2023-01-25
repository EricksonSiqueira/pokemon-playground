import { render, cleanup, waitFor } from '@testing-library/react';
import SEO from '..';
import {
  SEOMock,
  SEOWithoutTitleMock,
  SEOWithoutDescriptionMock,
} from '../mocks';

jest.mock(`next/head`, () => ({
  __esModule: true,
  default: ({ children }: { children: Array<React.ReactElement> }) => (
    <>{children}</>
  ),
}));

describe(`SEO`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it(`should render title received in props`, async () => {
    render(<SEO {...SEOMock} />);

    await waitFor(() => {
      expect(document.title).toBe(SEOMock.title);
    });
  });

  it(`should render default title when prop title isn't passed`, async () => {
    render(<SEO {...SEOWithoutTitleMock} />);

    await waitFor(() => {
      expect(document.title).toBe(`Pokedex - by Erickson`);
    });
  });

  it(`should render description received in props`, async () => {
    render(<SEO {...SEOMock} />);

    const description = document.querySelector(
      `meta[name='description']`,
    ) as HTMLTemplateElement;

    await waitFor(() =>
      expect(description?.content).toBe(`SEO mocked description`),
    );
  });

  it(`should render description received in props`, async () => {
    render(<SEO {...SEOWithoutDescriptionMock} />);

    const description = document.querySelector(
      `meta[name='description']`,
    ) as HTMLTemplateElement;

    await waitFor(() =>
      expect(description?.content).toBe(
        `Pokedex made to search all the pokemons info!`,
      ),
    );
  });
});