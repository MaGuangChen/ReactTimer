import expect from 'expect';
//it function可以定義測試名稱

//讓測試format，讓測試更容易讀，使得測試內容在App底下
describe('確認這個app的測試可以用', () =>{
   it('喂～應該是要測試的吧～',()=>{
  expect(1).toBe(1);
});
})