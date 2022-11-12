import { Model } from 'mongoose';
import { RepositoryService } from './repository.service';
jest.mock('./repository.service');

class Mock extends RepositoryService<object> {
  constructor(private mockModel: Model<object> = {} as any) {
    super(mockModel);
  }
}

const SERVICE_FUNCTION_NAMES = [
  'getConfig',
  'count',
  'lookById',
  'look',
  'lookOne',
  'pagination',
  'create',
  'update',
  'remove',
];

const SERVICE_PROPERTIES_NAME = [...SERVICE_FUNCTION_NAMES, 'mockModel'];

describe(RepositoryService.name, () => {
  const service = new Mock();

  test('Include all necessary functions', () => {
    expect(Object.keys(service)).toMatchObject(SERVICE_PROPERTIES_NAME);
    Object.entries(service).forEach(([name, fn]) => {
      expect(SERVICE_PROPERTIES_NAME.includes(name)).toBeTruthy();
      if (!SERVICE_FUNCTION_NAMES.includes(name)) return;
      expect(typeof fn).toBe('function');
    });
  });
});
