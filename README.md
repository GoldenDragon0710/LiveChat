# LiveChat

Integrated the React app into WordPress site.
- Implemented ChatGPT app
- Integrated ChatGPT(frontend) app into WordPress site

## Use `gpt-3.5-turbo` model
```sh
import openai

messages = [
  {"role": "system", "content": "..."},
  {"role": "user", "content": "..."},
  {"role": "assistant", "content": "..."},
]

response = openai.ChatCompletion.create(
  model = "gpt-3.5-turbo",
  messages = messages,
  temperature = 0.2,
)

print(response["choices"][0]["message"]["content"])
```

## Use `Country Select` component

### Use `i18n-iso-countries` library
```sh
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";


countries.registerLocale(enLocale);
countries.registerLocale(itLocale);


const countryobj = countries.getNames("en", { select: "official" });
const countryArr = Object.entries(countryobj).map(([key, value]) => {
  return {
    label: value,
    value: key
  };
});


<Select>
  {
    !!countryArr?.length && countryArr.map(({ label, value }) => {
      return (
        <Option key={value} value={label}>
          {label}
        </Option>
      )
    })
  }
</Select>
```

### Use `use-react-countries` library
```sh
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";


const { countries } = useCountries();


<Select
    size="lg"
    label="Select Country"
    selected={(element) =>
      element &&
      React.cloneElement(element, {
        className: "flex items-center px-0 gap-2 pointer-events-none",
      })
    }
  >
    {countries.map(({ name, flags }) => (
      <Option key={name} value={name} className="flex items-center gap-2">
        <img
          src={flags.svg}
          alt={name}
          className="h-5 w-5 rounded-full object-cover"
        />
        {name}
      </Option>
    ))}
  </Select>
```
