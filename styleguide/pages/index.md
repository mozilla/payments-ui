# Payments UI

This is the styleguide for the payments UI.

## Font size sets

> What size should the fonts be?
> Where should different font families, weights and sizes be used

I’ve simplified the font sizes down to five sets:

* Small: links (back, add credit card, etc.)
* `p` text: for general text, as well as for `.product` name and “per month” text
* `h1`: for `.product .title`
* Large text: slightly bigger than `h1`, for `product` currency and cent values, as well as the close "×" button
* Extra large text: for `.product .price`

We can reuse these five sets for the management interface:

## `font-family` designation

* Clear Sans
  * `body` (includes small text and `p` text)
  * `button`
  * `input`
* Fira Sans
  * `h1`
  * larger text
  * extra large text

## Colour palette

> What are the precise colours things should be

I think you’ve followed FxA’s colour palette pretty well already, from border to text to background.

There are just three colours that we use, that aren’t present in FxA:

* Red `#D83812`: for error messages and text
* Light blue `#E6F5FC`: for the background of currently selected payment method, and “Try Again” button on receipt
* Light grey `#F4FFf6`: for the background of “You will not be billed again` notification on receipt

## Layout breakpoints

> How should things change at varying widths

I have a responsive stylesheet for the pay interface that’s inspired by FxA’s. I think we should be able to reuse this for the management interface (although the management interface would be wider).

* Wide: `@media (mid-width:521px)`
* Medium: `@media (min-width:320px)`
  * Landscape – follow the styles used in Medium: `@media (max-width 520px), (orientation:landscape) and (min-width:481px) and (max-height:480px)`
* Narrow: `@media (max-width:319px)`

### Wide
![fxa-payments-modal-wide](https://cloud.githubusercontent.com/assets/51007/8845443/43140748-3173-11e5-8ea5-6030e6dd6b06.PNG)

### Medium
![fxa-payments-modal-medium](https://cloud.githubusercontent.com/assets/51007/8845447/4a7a21a2-3173-11e5-9514-270653e88e79.PNG)

### Narrow
![fxa-payments-modal-narrow](https://cloud.githubusercontent.com/assets/51007/8845451/561d96ba-3173-11e5-8687-1adb601e4ffb.png)

## CSS elements

* `.fxa-pay-modal`
  * Used for: pay modal, management column
* `<main>`
  * Used for: content inside pay modal
* small text
  * Used for: back link, add credit card link
* `p` text
  * Used for: `.product` name, `.product` per month
* `h1`
  * Used for: `.product .title`
* large text
  * Used for: `.product` currency & `.product` cent, close "×" button
* extra large text
  * Used for: `.product .price`
* `input`
* `button`
* vendor logo

## CSS values

> Should the padding around a button be proportional to the font-size or fixed?

As far as I know, FxA styleguide made button spacing fixed, but I’ve made it proportional in this table.

### Layout

| Element |     | Wide | Medium | Narrow |
| ------- | --- | ---- | ------ | ------ |
| modal | width         | 420px | 360px | 100% |
|       | height        |       |       | 100% |
|       | min-height    | 420px | 300px |      |
|       | border-radius | 4px | 2px | 0px |
|       | box-shadow    | 0px 1px 5px rgba(0,0,0,0.5) | same as wide |  |
|  |  |  |  |  |
| `<main>`  | padding | 25px 40px 40px | 8px 20px 20px | 8px 0px 20px |
|           | margin  |                |               | 85px auto 0px (slide down elements to accommodate vendor logo, then center align it horizontally) |


### Type

| Element |     | Wide | Medium | Narrow |
| ------- | --- | ---- | ------ | ------ |
| small text | font-size | 14px | same | same |
| `p` text | font-size | 18px | 14px | same as medium |
|          | line-height | 1.5 | same | same |
| `h1`   | font-size | 24px | 20px | same as medium |
|        | font-weight | 200 | same | same |
| `h1 .product .title` | padding-bottom | .5em | .45em | same as medium |
| large text | font-size | 32px | 24px | same as medium |
|            | font-weight | 200 | same | same |
| large text for `.product` currency and `.product` cent | font-weight | 400 | same | same |
|                                                        | position | relative | same | same |
|                                                        | bottom | .5em | same | same |
|                                                       | margin | 0 .2em | 0 .1em | same as medium |
| large text for close "×" button | color | #424F59 | same | same |
|                                 | font-size | 32px | same | same |
|                                 | line-height | 1 | same | same |
|                                 | padding | 0 | same | same |
|                                 | position | absolute | same | same |
|                                 | right | 9px | same | same |
| extra large text | font-size | 78px | 58px | same as medium |
|                  | font-weight | 200 | same | same |
| extra large text for `.product .price` | margin-bottom | .25em | same | same |


### Form elements

| Element |     | Wide | Medium | Narrow |
| ------- | --- | ---- | ------ | ------ |
| input  | border-radius | 4px | 2px | same as medium |
|        | font-size     | 18px | 16px | same as medium |
|        | height        | 45px | 40px | same as medium |
|        | padding       | 0 20px | 0 15px | same as medium |
|        | margin        | 12.5px 0 | same | same |
| button | font-size     | 24px | 20px | 18px |
|        | height        | 63px | 44px | 41px |
|        | line-height   | 1 | same | same |
|        | margin        | .83em 0 | .75em 0 | .55em 0 |


### Logos

| Element |     | Wide | Medium | Narrow |
| ------- | --- | ---- | ------ | ------ |
| vendor logo | width & height | 85px | 55px | same as medium |
|             | top            | -42.5px | -27.5px | 27.5px (move vendor logo down to be inside modal area) |

