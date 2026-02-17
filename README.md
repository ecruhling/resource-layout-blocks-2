<div id="top"></div>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<br />
<div align="center">
  <a href="https://github.com/ecruhling/resource-layout-blocks">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Resource Branding<br />
Layout blocks for WordPress (2.0)</h3>

  <p align="center">
    Custom layout blocks for the WordPress block editor.<br />
Container, Row, and Column.<br />
Uses CSS and utility classes from Twitter Bootstrap 5.
    <br />
    <a href="https://github.com/ecruhling/resource-layout-blocks-2"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ecruhling/resource-layout-blocks-2">View Demo</a>
    ·
    <a href="https://github.com/ecruhling/resource-layout-blocks-2/issues">Report Bug</a>
    ·
    <a href="https://github.com/ecruhling/resource-layout-blocks-2/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Layout Blocks 2.0

![Layout Blocks Screen Shot][product-screenshot]

Custom layout blocks for the WordPress block editor. Container, Row, and Column. Uses CSS and utility classes from
Twitter Bootstrap 5.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Vite](https://vite.dev/)
* [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
* [Bootstrap](https://getbootstrap.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Note: This is a complete rewrite and retooling of a [previous plugin](https://github.com/ecruhling/resource-layout-blocks).

WordPress plugin – install and activate.

### Prerequisites

Requires PHP >= 7.0. Requires WordPress >= 5.9.

## Features
- A 'Class Inspector' area is added to the Block Control Toolbar. This dynamically lists all the CSS classes added to the
block during creation and editing. It provides a concise, quick way
of telling exactly what classes are added throughout all breakpoints, including any custom CSS classes added in the
Advanced sidebar.

- Blocks have an 'inlineStyle' attribute. This attribute is editable in the side panel, under the Advanced accordion - 'Inline Styles'. Must be a valid string of inline CSS. Be aware that as some native WordPress attributes (like
'align' and 'alignWide') are dependent on inline CSS, these attributes are not compatible with these blocks.
<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [ ] Setting to enable Bootstrap or Tailwind classes (backend only).

See the [open issues](https://github.com/ecruhling/resource-layout-blocks/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Erik Rühling - erik@resourceatlanta.com

Project Link: [https://github.com/ecruhling/resource-layout-blocks-2](https://github.com/ecruhling/resource-layout-blocks)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ecruhling/resource-layout-blocks.svg

[contributors-url]: https://github.com/ecruhling/resource-layout-blocks/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/ecruhling/resource-layout-blocks.svg

[forks-url]: https://github.com/ecruhling/resource-layout-blocks/network/members

[stars-shield]: https://img.shields.io/github/stars/ecruhling/resource-layout-blocks.svg

[stars-url]: https://github.com/ecruhling/resource-layout-blocks/stargazers

[issues-shield]: https://img.shields.io/github/issues/ecruhling/resource-layout-blocks.svg

[issues-url]: https://github.com/ecruhling/resource-layout-blocks/issues

[license-shield]: https://img.shields.io/github/license/ecruhling/resource-layout-blocks.svg

[license-url]: https://github.com/ecruhling/resource-layout-blocks/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg

[linkedin-url]: https://linkedin.com/in/erik-r%C3%BChling-1a452138

[product-screenshot]: logo.png
