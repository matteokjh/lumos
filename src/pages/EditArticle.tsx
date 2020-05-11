import React, { useEffect, useState, useContext } from 'react';
import '@/pages/styles/EditArticle.sass';
import { Button, Input, message, Tooltip, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import MarkdownEditor from '@/components/ReactMd/MarkdownEditor';
import { ArticleProps } from '@/types/articles';
import { saveArticle, getUserArticle } from '@/api/article';
import { store } from '@/store';

const EditArticle = (props: any) => {
    const history = useHistory();
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps);
    const [articleId, setArticleId] = useState('');
    const [mdContent, setMdContent] = useState(''); // 右边的真实data
    const [form] = Form.useForm();
    const { userInfo } = useContext(store).state;

    // methods
    const goBack = () => {
        if (articleId) {
            history.push(`/user/${userInfo.username}/articles/post`);
        } else {
            history.push(`/`);
        }
    };
    // 保存
    const saveMd = async () => {
        let title, subTitle;
        try {
            let values = await form.validateFields();
            title = values.title;
            subTitle = values.subTitle;
        } catch (err) {
            return;
        }
        try {
            let res = await saveArticle({
                username: userInfo.username,
                aid: articleId,
                content: mdContent,
                title,
                subTitle,
            });
            if (res.code === 200) {
                message.success(res.msg);
                // 如果是在 /write，跳转到 /write/:aid
                if (!articleId) {
                    history.push(`/write/${res.data.aid}`);
                }
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        }
    };

    useEffect(() => {
        setArticleId(props.match.params.aid);
    }, [props.match.params.aid]);

    // 如果是编辑，获取文章数据
    useEffect(() => {
        if (articleId) {
            // 请求
            (async () => {
                try {
                    let res = await getUserArticle(articleId);
                    if (res.code === 200) {
                        const article = res.data;
                        setArticleInfo(article);
                        setMdContent(article.content || '');

                        form.setFieldsValue({
                            title: article.title,
                            subTitle: article.subTitle,
                        });
                    } else {
                        message.error(res.msg);
                    }
                } catch (err) {
                    message.error(err);
                }
            })();
        }
        // eslint-disable-next-line
    }, [articleId]);

    return (
        <div className="EditArticle">
            <div className="top">
                <div className="returnBtn">
                    <Button onClick={goBack}>返回</Button>
                </div>
                <Form form={form} className="titleForm">
                    <div className="titleInput">
                        <span>
                            主标题
                            <span>
                                <Tooltip title="字数不超过 40">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </span>
                            ：
                        </span>
                        <Form.Item name="title">
                            <Input
                                placeholder="请在此输入主标题"
                                spellCheck={false}
                                maxLength={40}
                            ></Input>
                        </Form.Item>
                    </div>
                    <div className="titleInput">
                        <span>
                            副标题
                            <span>
                                <Tooltip title="字数不超过 80">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </span>
                            ：
                        </span>
                        <Form.Item name="subTitle">
                            <Input
                                placeholder="请在此输入副标题"
                                spellCheck={false}
                                maxLength={40}
                            ></Input>
                        </Form.Item>
                    </div>
                </Form>
                <div className="saveBtn">
                    <Button type="primary" onClick={saveMd}>
                        保存
                    </Button>
                </div>
            </div>
            <div className="main">
                {/* markdown editor */}
                <MarkdownEditor
                    mdContent={mdContent}
                    setMdContent={setMdContent}
                    articleInfo={articleInfo}
                    saveMd={saveMd}
                ></MarkdownEditor>
            </div>
        </div>
    );
};

export default EditArticle;
