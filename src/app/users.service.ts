import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor() {
	}

	get() {
		return [{
			"idUsuario": 46,
			"nombre": "Carlos Morcillo",
			"idRol": 6,
			"idDept": 2,
			"id": 46,
			"value": "Carlos Morcillo",
			"role": {
				"idRol": 6,
				"nombre": "Jefe de proyecto"
			}
		},
		{
			"idUsuario": 54,
			"nombre": "Antonio García",
			"idRol": 2,
			"idDept": 2,
			"id": 54,
			"value": "Antonio García",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 90,
			"nombre": "Gregorio Jiménez",
			"idRol": 2,
			"idDept": 2,
			"id": 90,
			"value": "Gregorio Jiménez",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 92,
			"nombre": "Rubén Hernández",
			"idRol": 2,
			"idDept": 2,
			"id": 92,
			"value": "Rubén Hernández",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 116,
			"nombre": "Francisco Calvo",
			"idRol": 2,
			"idDept": 2,
			"id": 116,
			"value": "Francisco Calvo",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 136,
			"nombre": "Rubén Ortega",
			"idRol": 2,
			"idDept": 2,
			"id": 136,
			"value": "Rubén Ortega",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 40,
			"nombre": "Vicent Alonso",
			"idRol": 1,
			"idDept": 1,
			"activo": true,
			"id": 40,
			"value": "Vicent Alonso",
			"role": {
				"idRol": 1,
				"nombre": "Director"
			}
		},
		{
			"idUsuario": 89,
			"nombre": "Jesús Garcia",
			"idRol": 2,
			"idDept": 1,
			"activo": true,
			"id": 89,
			"value": "Jesús Garcia",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 122,
			"nombre": "Jose Heredia",
			"idRol": 2,
			"idDept": 1,
			"activo": true,
			"id": 122,
			"value": "Jose Heredia",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 133,
			"nombre": "José Joaquín",
			"idRol": 2,
			"idDept": 1,
			"activo": true,
			"id": 133,
			"value": "José Joaquín",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 134,
			"nombre": "Roberto",
			"idRol": 2,
			"idDept": 1,
			"activo": true,
			"id": 134,
			"value": "Roberto",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 143,
			"nombre": "Jose Luis Muñoz",
			"idRol": 2,
			"idDept": 1,
			"activo": true,
			"id": 143,
			"value": "Jose Luis Muñoz",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 9,
			"nombre": "Javier Alfaro",
			"idRol": 2,
			"idDept": 3,
			"activo": true,
			"id": 9,
			"value": "Javier Alfaro",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		},
		{
			"idUsuario": 25,
			"nombre": "Guillermo Sánchez",
			"idRol": 6,
			"idDept": 3,
			"activo": true,
			"id": 25,
			"value": "Guillermo Sánchez",
			"role": {
				"idRol": 6,
				"nombre": "Jefe de proyecto"
			}
		},
		{
			"idUsuario": 83,
			"nombre": "Conrado Pardo",
			"idRol": 4,
			"idDept": 3,
			"activo": true,
			"id": 83,
			"value": "Conrado Pardo",
			"role": {
				"idRol": 4,
				"nombre": "Diseñador"
			}
		},
		{
			"idUsuario": 91,
			"nombre": "Pedro Monteagudo",
			"idRol": 2,
			"idDept": 3,
			"activo": true,
			"id": 91,
			"value": "Pedro Monteagudo",
			"role": {
				"idRol": 2,
				"nombre": "Desarrollador"
			}
		}
		];
	}
}
