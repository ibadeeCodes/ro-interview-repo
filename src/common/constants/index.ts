export const NODE_ENV = {
    DEVELOPMENT: 'development',
    QA: 'qa',
    STAGING: 'staging',
    PRODUCTION: 'production',
}

export const API_LAUNCH_MESSAGE = "RO INTERVIEW DEMO API Launched 🚀"

// Entities:
export const USER = 'User'
export const PRODUCT = 'Product'

// Operations:
export const CREATED = (entity: string) => `${entity} Created`
export const BULK_CREATED = (entity: string) => `${entity} Created In Bulk`
export const FIND_ALL = (entity: string) => `${entity} Listed`
export const UPDATED = (entity: string) => `${entity} Updated`;
export const REMOVED = (entity: string) => `${entity} Removed`;
export const FIND_ONE = (entity: string) => `${entity} Extracted`;
export const DOES_NOT_EXIST = (entity: string) => `${entity} does not exist!`
export const ALREADY_EXIST = (entity: string) => `${entity} already exist!`
export const TOTAL_COUNT = (entity: string) => `${entity} total count`
export const APPLIED = (entity: string) => `${entity} Applied`

export enum ROLE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER'
}

export enum ROLE_ID {
    SUPER_ADMIN = 1,
    EMPLOYEE = 2,
    MANAGER = 3
}

export const RESPONSE_STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    BADREQUEST: 400
};

export const RESPONSE_STATUS = {
    SUCCESS: true,
    FAIL: false
};

export const PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

export const FILE_TYPE = {
    CSV: 'csv'
}

export enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum DATABASE_ERROR_CODES {
    UNIQUE_INDEX = '23505'
}

export enum ORDER_BY {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}


export enum STATUSES {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    MANAGER_REJECTED = 'MANAGER_REJECTED',
    EXPIRED = 'EXPIRED',
    PENDING = 'PENDING'
}

export enum SwapRequestStatus {
    PENDING_RECIPIENT = 'PENDING_RECIPIENT',
    ACCEPTED_BY_RECIPIENT = 'ACCEPTED_BY_RECIPIENT',
    REJECTED_BY_RECIPIENT = 'REJECTED_BY_RECIPIENT',
    APPROVED_BY_MANAGER = 'APPROVED_BY_MANAGER',
    REJECTED_BY_MANAGER = 'REJECTED_BY_MANAGER',
    EXPIRED = 'EXPIRED',
}