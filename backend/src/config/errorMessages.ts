'use strict';

import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/IErrorMessages';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
    'user:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with missing information.',
        userMessage: 'Impossible de créer un utilisateur avec des données manquantes.'
    },
    'user:create:missingFirstName': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without first name.',
        userMessage: 'Veuillez indiquer votre prénom.'
    },
    'user:create:missingLastName': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without last name.',
        userMessage: 'Veuillez indiquer votre nom.'
    },
    'user:create:missingEmail': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without email.',
        userMessage: 'Veuillez indiquer votre adresse e-mail.'
    },
    'user:create:missingPassword': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without password.',
        userMessage: 'Veuillez indiquer votre mot de passe.'
    },
    'user:create:emailAlreadyExist': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with this email.',
        userMessage: "L'adresse e-mail que vous avez fourni est déjà utilisé."
    },
    'user:show:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the user caused by missing information.',
        userMessage: "Impossible de trouver un utilisateur sans fournir d'id."
    },
    'user:update:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
        userMessage: "Impossible de mettre à jour l'utilisateur avec des données manquantes."
    },
    'user:update:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
        userMessage: "Impossible de mettre à jour l'utilisateur avec des données manquantes."
    },
    'user:delete:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to delete the user caused by missing information.',
        userMessage: "Impossible de supprimer un utilisateur sans fournir d'id."
    },
    'user:notFound': {
        type: 'notFound',
        httpStatus: HttpStatus.NOT_FOUND,
        errorMessage: 'Unable to found the user with the provided information.',
        userMessage: 'Aucun utilisateur trouvé avec les informations fourni.'
    },
    'request:unauthorized': {
        type: 'unauthorized',
        httpStatus: HttpStatus.UNAUTHORIZED,
        errorMessage: 'Access unauthorized.',
        userMessage: 'Accès non autorisé.'
    },
    'auth:login:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to show the todo caused by missing information.',
        userMessage: "Impossible de trouver un todo sans fournir d'id."
    },
    'auth:login:missingEmail': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without email.',
        userMessage: 'Veuillez indiquer votre adresse e-mail.'
    },
    'auth:login:missingPassword': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without password.',
        userMessage: 'Veuillez indiquer votre mot de passe.'
    },
    'auth:register:userAlreadyExists': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'This email already exists.',
        userMessage: 'Cette adresse e-mail est déjà enregistrée.'
    },
    'todo:create:missingTitle': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new todo without title.',
        userMessage: 'Impossible de créer un todo avec des données manquantes.'
    },
    'todo:show:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the todo caused by missing information.',
        userMessage: "Impossible de trouver un todo sans fournir d'id."
    },
    'todos:show:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to show the todo caused by missing information.',
        userMessage: "Impossible de trouver un todo sans fournir d'id."
    },
    'todo:update:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the todo caused by missing information.',
        userMessage: "Impossible de mettre à jour le todo avec des données manquantes."
    },
    'todo:delete:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to delete the todo caused by missing information.',
        userMessage: "Impossible de supprimer un todo sans fournir d'id."
    },
    'todo:notFound': {
        type: 'notFound',
        httpStatus: HttpStatus.NOT_FOUND,
        errorMessage: 'Unable to found the todo with the provided information.',
        userMessage: 'Aucun todo trouvé avec les informations fourni.'
    }
};
