'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nb-table-sorter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f44b85b7709c3829bd1d995ef8b7f4ab"' : 'data-target="#xs-components-links-module-AppModule-f44b85b7709c3829bd1d995ef8b7f4ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f44b85b7709c3829bd1d995ef8b7f4ab"' :
                                            'id="xs-components-links-module-AppModule-f44b85b7709c3829bd1d995ef8b7f4ab"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NbTableSorterModule.html" data-type="entity-link">NbTableSorterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' : 'data-target="#xs-components-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' :
                                            'id="xs-components-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                            <li class="link">
                                                <a href="components/NbTableSorterPaginatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NbTableSorterPaginatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableSorterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableSorterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' : 'data-target="#xs-directives-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' :
                                        'id="xs-directives-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                        <li class="link">
                                            <a href="directives/NbTableSorterHeaderDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NbTableSorterHeaderDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NbTableSorterNotFoundDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NbTableSorterNotFoundDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NbTableSorterRowDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NbTableSorterRowDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' : 'data-target="#xs-pipes-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' :
                                            'id="xs-pipes-links-module-NbTableSorterModule-c0fe9c68cf77fd4ee46becdae820bc8f"' }>
                                            <li class="link">
                                                <a href="pipes/GetPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GetPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsObjectPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsObjectPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsStringPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsStringPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PaginatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UcfirstPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UcfirstPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ValueOrDatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ValueOrDatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/MockedUsersService.html" data-type="entity-link">MockedUsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationService.html" data-type="entity-link">PaginationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/NbTableSorterHeader.html" data-type="entity-link">NbTableSorterHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableSorterOptions.html" data-type="entity-link">TableSorterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableSorterOrdination.html" data-type="entity-link">TableSorterOrdination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableSorterPagination.html" data-type="entity-link">TableSorterPagination</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});