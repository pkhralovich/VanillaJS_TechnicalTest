# Technical Frontend test for NetRivals

The target was to design and implement a responsive page that allows users to apply a mathematical formula to a list of products.
Some of the requirements were:

- Use semantic HTML
- Responsive design
- The implementation should be made using a VanillaJS state-based component
- The component should have an "edit" mode
- The component should have a "display" mode
- The component must validate the formula
- The formula should be persisted

No API description or endpoints were given, so I decided to make some assumptions for being able to deliver something similar to a real use case.

**The time spent for the entire development was about 12-14 hours** 

## Assumptions taken

I decided to create a mock API with several endpoints. Each one of the endpoints has a different amount of products, going from 10 to 8000. The target was to be able to test the performance of the component. Obviously, in a real environment where the performance is imperative, I should've implemented pagination or some other alternative. 

Also, to be able to persist the changes made to the formulas I decided to use localStorage through a Controller class, hiding the logic to the component. This allows replacing the localStorage for an API call without having to change the component.

Finally, I assumed that every product has a unique id, a short description, a squared image, and that the price is a valid value.

## Libraries

I only used two external libraries. The first one was axios to make HTTL calls. The other one was MathJS, which allows me to validate and evaluate the formula without building an entire mathematical engine based on trees and operations priority.

As it was a Vanilla JS assignment, I decided to not use npm or any related tool.

## Tools

For the development, I used Visual Studio Code the Live Server extension, which allowed me to have a simple HTTP server that automatically refreshes my page during the development. I also used Github.

Some external tools that I also used were:
- Regex101 (https://regex101.com/) to develop and test a regular expression that I used for the formula validation.
- Mocky (https://designer.mocky.io/) to create a mock HTTP endpoint.
- JSON Generator (https://www.json-generator.com/) to be able to generate a big array of products.

## Improvements or future work

Some of the steps that might be done to improve the work are:
  - Replace localStorage and mock calls for a real API.
  - Improve de UI designed. A lot of space is lost in each row.
  - Add multilanguage.
  - Use HTML to show in a better way the formula validation errors.
  - Implement pagination or some alternative system for performance issues with long lists.
  - Allow the user to configure the currency and the decimal places, which configuration is already supported by the component.
  - Improve the help dialog box. Now it's really annoying for the user.

