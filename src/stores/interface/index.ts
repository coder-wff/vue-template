/* GlobalState */
export interface GlobalState {
	token: string
	userInfo: any
}

/* AuthState */
export interface AuthState {
	routeName: string
	authButtonList: {
		[key: string]: string[]
	}
	authMenuList: Menu.MenuOptions[]
}
