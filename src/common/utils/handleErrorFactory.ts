import { QueryFailedError } from 'typeorm';
import { DATABASE_ERROR_CODES, RESPONSE_STATUS } from '../constants'; 
import { UtilsService } from './utils.service'; 

export function handleErrorFactory(error: any) {
  let errorMessage = error.message;

  if (error instanceof QueryFailedError) {
    switch (error.driverError.code) {
      case DATABASE_ERROR_CODES.UNIQUE_INDEX:
        errorMessage = error.driverError.detail;
        break;
      // Add more cases for other error codes if needed
      default:
        errorMessage = 'Database error occurred';
    }
  } else {
    // Handle other error types or provide a generic error message
    errorMessage = error.message || 'An unexpected error occurred';
  }

  return UtilsService.getErrorModelStatic(
    RESPONSE_STATUS.FAIL,
    errorMessage,
    error
  );
}
