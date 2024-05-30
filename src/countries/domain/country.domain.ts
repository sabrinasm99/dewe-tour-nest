import { z } from 'zod';

const CountrySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type CountryProps = z.infer<typeof CountrySchema>;

export class Country {
  constructor(private props: CountryProps) {}

  getProps() {
    return this.props;
  }

  public static create(props: CountryProps) {
    const validatedProps = CountrySchema.parse(props);
    return new Country(validatedProps);
  }
}
