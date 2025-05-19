import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { AuthService } from 'app/core/auth/auth.service';
import { items } from 'app/mock-api/apps/file-manager/data';
import {
    compactNavigation_admin,
    defaultNavigation_admin,
    futuristicNavigation_admin,
    horizontalNavigation_admin,

    compactNavigation_colaborador,
    defaultNavigation_colaborador,
    futuristicNavigation_colaborador,
    horizontalNavigation_colaborador,

    compactNavigation,
    defaultNavigation,
    futuristicNavigation,
    horizontalNavigation,
} from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NavigationMockApi {

    private _compactNavigation: FuseNavigationItem[];

    private _defaultNavigation: FuseNavigationItem[];

    private _futuristicNavigation: FuseNavigationItem[];

    private _horizontalNavigation: FuseNavigationItem[];

    /*
    private readonly _compactNavigation: FuseNavigationItem[] =
        compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] =
        defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] =
        futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] =
        horizontalNavigation;
        */

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService,
        private _authService: AuthService
    ) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        //buscamos el rol

        const userData = localStorage.getItem('user');
        var roles: any[];
        var rol = '';
        if (userData) {
            roles = JSON.parse(userData).roles;
        }
        if (roles != null) {
            if (roles.indexOf('Administrador') != -1 && rol == '') { rol = 'Administrador' }
            if (roles.indexOf('Supervisor') != -1 && rol == '') { rol = 'Supervisor' }
        }

        if (rol == 'Administrador') {
            this._compactNavigation = compactNavigation_admin;
            this._defaultNavigation = defaultNavigation_admin;
            this._futuristicNavigation = futuristicNavigation_admin;
            this._horizontalNavigation = horizontalNavigation_admin;
        }

        if (rol == 'Colaborador') {
            this._compactNavigation = compactNavigation_colaborador;
            this._defaultNavigation = defaultNavigation_colaborador;
            this._futuristicNavigation = futuristicNavigation_colaborador;
            this._horizontalNavigation = horizontalNavigation_colaborador;
        }

        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            // Fill compact navigation children using the default navigation
            this._compactNavigation.forEach((compactNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === compactNavItem.id) {
                        compactNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Fill futuristic navigation children using the default navigation
            this._futuristicNavigation.forEach((futuristicNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === futuristicNavItem.id) {
                        futuristicNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Fill horizontal navigation children using the default navigation
            this._horizontalNavigation.forEach((horizontalNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === horizontalNavItem.id) {
                        horizontalNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Return the response
            return [
                200,
                {
                    compact: cloneDeep(this._compactNavigation),
                    default: cloneDeep(this._defaultNavigation),
                    futuristic: cloneDeep(this._futuristicNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation),
                },
            ];
        });
    }
}
