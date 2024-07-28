import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { IMutationPayrollRequestParams } from './PayInterface';

class PayrollServiceApi {
  async getAllPayroll() {
    try {
      const response = await http.get(API_ROUTES.PAYROLL);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createPayroll(payload: IMutationPayrollRequestParams) {
    try {
      const response = await http.post(API_ROUTES.PAYROLL, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPayrollDetail(payId?: string) {
    try {
      const response = await http.get(`${API_ROUTES.PAYROLL}/${payId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deletePayroll(payrollId: string) {
    try {
      const response = await http.delete(
        `${API_ROUTES.PAYROLL}/${Number(payrollId)}`,
      );

      const data = await response.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updatePayroll(params: {
    payId: string;
    payload: IMutationPayrollRequestParams;
  }) {
    try {
      const response = await http.put(
        `${API_ROUTES.PAYROLL}/${Number(params.payId)}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPayrollMember(id?: string) {
    try {
      const response = await http.get(`${API_ROUTES.PAYROLL}/${id}/member`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberNonPayroll(projectId?: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.PAYROLL}/${projectId}/members`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const payrollService = new PayrollServiceApi();

export default payrollService;
