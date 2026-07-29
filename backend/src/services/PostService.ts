import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  private postRepository: PostRepository;

  constructor(PostRepositoryInstance: PostRepository) {
    this.postRepository = PostRepositoryInstance;
  }

  public async createPost(authorId: string, content: string) {
    return await this.postRepository.createPost(authorId, content);
  }

  public async getAllPost(limit: number, page: number) {
    const result = await this.postRepository.getAllPost(limit, page);

    const meta = {
      totalData: 0,
      totalPage: 0,
    };

    const constructedPost = result.map(
      ({ passwordHash, total_data, total_page, ...rest }) => {
        meta.totalData = Number(total_data);
        meta.totalPage = Number(total_page);

        return rest;
      },
    );

    return {
      post: constructedPost,
      meta,
    };
  }
}

/*

{
    id: '068a9729-8bb9-45db-863a-172b35bc80c6',
    authorId: '068a9729-8bb9-45db-863a-172b35bc80c6',
    content: 'This is a brand new post!',
    createdAt: 2026-07-24T03:17:56.196Z,
    updatedAt: 2026-07-24T03:17:56.196Z,
    deletedAt: null,
    firstName: 'Novpa',
    lastName: 'Rodriguez',
    gender: 'MALE',
    email: 'agungnovpa@gmail.com',
    passwordHash: '$2b$10$uF956k4f4e8RtQQsVvP9Z.QNZSHVib9.BfOklZxAh79GdCsfvUZ7q',
    avatar: null,
    isOnline: false,
    totaldata: '2',
    totalpage: 2
  }

*/
