import { IPaginationMeta } from 'src/types';

export const mapMetaData = (
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  currentPage: number,
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const meta: IPaginationMeta = {
    totalItems,
    itemCount,
    itemsPerPage,
    totalPages,
    currentPage,
  };
  return meta;
};

export const removeAccents = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

export const addFullNameFilter = (
  qb: any,
  alias: string,
  full_name: string,
): void => {
  const normalizedFullName = removeAccents(full_name);
  qb.andWhere(
    `(LOWER(${alias}.full_name) LIKE :full_name_lower OR 
       LOWER(TRANSLATE(${alias}.full_name, 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :full_name_normalized)`,
    {
      full_name_lower: `%${full_name.toLowerCase()}%`,
      full_name_normalized: `%${normalizedFullName}%`,
    },
  );
};

export const addEmployeeCodeFilter = (
  qb: any,
  alias: string,
  employee_code: string,
): void => {
  const normalizedEmployeeCode = removeAccents(employee_code);
  qb.andWhere(
    `(LOWER(${alias}.employee_code) LIKE :employee_code_lower OR 
       LOWER(TRANSLATE(${alias}.employee_code, 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :employee_code_normalized)`,
    {
      employee_code_lower: `%${employee_code.toLowerCase()}%`,
      employee_code_normalized: `%${normalizedEmployeeCode}%`,
    },
  );
};

export const addKeywordFilter = (
  qb: any,
  alias: string,
  key_word: string,
): void => {
  const normalizedKeyword = removeAccents(key_word);
  qb.andWhere(
    `(LOWER(${alias}.full_name) LIKE :key_word_lower OR 
     LOWER(${alias}.employee_code) LIKE :key_word_lower OR
       LOWER(${alias}.username) LIKE :key_word_lower OR
       LOWER(TRANSLATE(${alias}.full_name, 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :key_word_normalized OR
       LOWER(TRANSLATE(${alias}.employee_code, 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :key_word_normalized OR
       LOWER(TRANSLATE(${alias}.username, 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :key_word_normalized)`,
    {
      key_word_lower: `%${key_word.toLowerCase()}%`,
      key_word_normalized: `%${normalizedKeyword}%`,
    },
  );
};
