package kr.ac.kumoh.illdang100.tovalley.service.comment;

import kr.ac.kumoh.illdang100.tovalley.domain.comment.Comment;
import kr.ac.kumoh.illdang100.tovalley.domain.comment.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static kr.ac.kumoh.illdang100.tovalley.util.ListUtil.isEmptyList;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    @Transactional
    public void deleteCommentByLostFoundBoardIdInBatch(Long lostFoundBoardId) {
        List<Comment> findCommentList = commentRepository.findCommentByLostFoundBoardId(lostFoundBoardId);

        if (!isEmptyList(findCommentList)) {
            commentRepository.deleteAllByIdInBatch(findCommentList.stream()
                    .map(Comment::getId)
                    .collect(Collectors.toList()));
        }
    }
}
