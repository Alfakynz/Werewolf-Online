export interface RoleCard {
	roleId1: string
	rarity: string
}

export interface Player {
	username: string
	level: number
	personalMessage: string
	lastOnline: string
	creationTime: string
	receivedRosesCount: number
	sentRosesCount: number
	status: string
	clanId: string | null
	equippedAvatar: { url: string }
	roleCards: RoleCard[]
}

export interface ClanInfo {
	name: string
}

export interface Role {
	id: string
	name: string
	image: { url: string }
}

export interface DisplayRole {
	roleId1: string
	name: string
	img: string
	rarity: string
}
